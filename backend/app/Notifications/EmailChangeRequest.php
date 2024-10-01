<?php
namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class EmailChangeRequest extends Notification
{

    /**
     * Create a new notification instance.
     *
     * @param string $id
     * @param  string $email
     * @return void
     */
    public function __construct($id, $email)
    {
        $this->id = $id;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $id = $this->id;
        $hash =  sha1($this->email);
        $url = config('app.frontend.url')."/email-change/$id/$hash";

        return (new MailMessage)
            ->subject(Lang::get('Email Change Request'))
            ->greeting(Lang::get('Hello!'))
            ->line(Lang::get('You are receiving this email because we received a email change request for your account.'))
            ->action(Lang::get('Change Email'), $url)
            ->line(Lang::get('If you did not request a password reset, no further action is required.'));
    }
}
