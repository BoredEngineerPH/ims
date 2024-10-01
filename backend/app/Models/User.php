<?php

namespace App\Models;

use App\Models\UserMeta;

use App\Notifications\VerifyEmail;
use App\Notifications\VerifyEmailSuccess;
use App\Notifications\ResetPassword;
use App\Notifications\EmailChangeRequest;


use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Visible fields
     */
    protected $visible = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Soft delete user_meta related data
     */
    protected static function booted()
    {
        static::deleting(function ($user) {
            // Soft delete related comments when a post is soft-deleted
            $user->meta()->each(function ($meta) {
                $meta->delete(); // Soft delete each comment
            });
        });
    }

   /**
     * User meta
     */
    public function meta(): HasMany
    {
        return $this->hasMany(UserMeta::class);
    }

    /**
     * Get current logged user
     *
     * @param bool $full
     * @return array
     */
    public static function getCurrentUser(): array
    {
        $obj = [];
        $user = auth()->user();
        $obj = $user->toArray();
        $obj['id'] = $user->id;
        $meta_fields = $user->meta()->get();
        if(is_array($meta_fields)){
            $obj['meta'] = [];
            foreach($meta_fields as $field){
                $value = @json_decode($field->meta_value);
                if(json_last_error() === JSON_ERROR_NONE){
                    $obj['meta'][$field->meta_key] = $value;
                }else{
                    if(@unserialize($field->meta_value) !== false){
                        $obj['meta'][$field->meta_key] = unserialize($field->meta_value);
                    }else{
                        $obj['meta'][$field->meta_key] = $field->meta_value;
                    }
                }
            }
        }

        return $obj;
    }

    /**
     * Get user by ID
     *
     * @param int $id
     * @return array
     */
    public static function getUserById(int $id): array
    {
        $user = User::find($id);
        if($user){
            $data = $user->toArray();
            foreach($user->meta as $meta){
                $data[$meta->meta_key] = $meta->meta_value;
            }
            return $data;
        }else{
            return [];
        }
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendVerifyEmailNotification()
    {
        $this->notify(new VerifyEmail());
    }

    /**
     * Send the email notification after successful email verification.
     *
     * @return void
     */
    public function sendVerifyEmailSuccessNotification()
    {
        $this->notify(new VerifyEmailSuccess());
    }

    /**
     * Send the email notification with password reset link
     *
     * @param string $email
     * @return void
     */
    public function sendResetPasswordNotification(string $email)
    {
        $this->notify(new ResetPassword($email));
    }

    /**
     * Send the email notification with email change link
     *
     * @param string $id
     * @param string $email
     * @return void
     */
    public function sendEmailChangeNotification(string $id, string $email)
    {
        $this->notify(new EmailChangeRequest($id, $email));
    }
}
