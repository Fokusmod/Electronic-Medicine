package com.electronic.medicine.services;

import com.electronic.medicine.exception.MedicineBadCredential;
import jakarta.mail.MessagingException;
import jakarta.mail.SendFailedException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.angus.mail.smtp.SMTPAddressFailedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailSender {

    private final JavaMailSender javaMailSender;

    @Value("${mail.username}")
    private String username;

    public void sendMessage(String emailTo, String subject, String message) {
        try {
            MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(username, "Electronic Medicine");
            messageHelper.setTo(emailTo);
            messageHelper.setSubject(subject);
            messageHelper.setText(message, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.debug("Что то пошло не так, возможно почты {} не существует", emailTo);
            throw new MedicineBadCredential("Что то пошло не так, возможно почты " + emailTo + " не существует");
        }
    }
}
