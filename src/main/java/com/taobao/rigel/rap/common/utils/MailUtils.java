package com.taobao.rigel.rap.common.utils;

import com.taobao.rigel.rap.common.config.PRIVATE_CONFIG;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailUtils {
    public static void sendMessage(String[] addressList, String title,
                                   String content) throws AddressException {
        Address[] addresses = new Address[addressList.length];
        for (int i = 0; i < addressList.length; i++) {
            addresses[i] = new InternetAddress(addressList[i]);
        }

        // Sender's email ID needs to be mentioned
        String from = "rap@domain.com";
        final String username = PRIVATE_CONFIG.mailUserName;
        final String password = PRIVATE_CONFIG.mailPassword;

        // Get system properties
        Properties props = System.getProperties();

        // Setup mail server
        props.put("mail.smtp.host", "smtp-inc.domain.com");
        props.put("mail.smtp.port", "25");
        props.put("mail.smtp.auth", "true");

        props.put("mail.smtp.starttls.enable", "true");

        // Get the default Session object.
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                                username, password);
                    }
                });

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipients(Message.RecipientType.BCC, addresses);

            // Set Subject: header field
            message.setSubject(title, "UTF-8");

            // Now set the actual message
            message.setText(content, "UTF-8");

            // Send message
            Transport.send(message);
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
}
