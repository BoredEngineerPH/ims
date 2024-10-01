<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\HtmlString;


class VerifyEmail extends Notification
{
    use Queueable;

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }


/**
     * Get the verification URL for the given notifiable.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($id, $hash)
    {
        $customUrl = config('app.frontend.url').'/email-verify/'.$id.'/'.$hash;
        return $customUrl;
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $id =  $notifiable->getKey();
        $hash =  sha1($notifiable->getEmailForVerification());
        return (new MailMessage)
            ->greeting('Hello there!')
            ->subject('Almost there, Can you verify your email?')
            ->line('Just one more step. Please click the button below to verify your email address.')
            ->action('Verify Email Address', $this->verificationUrl($id, $hash))
            ->line('If you did not create an account, no further action is required.');
    }
}
