package de.akquinet.aerogear.android.services;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.IBinder;
import de.akquinet.aerogear.android.R;
import de.akquinet.stomp.MessageListener;
import de.akquinet.stomp.StompClient;

import java.io.IOException;

import static java.lang.Integer.valueOf;

public class MessagingService extends Service implements MessageListener {
    private StompClient stompClient;

    private String host;
    private String port;
    private String username;
    private String password;
    private String destination;

    private AsyncTask stayConnected = new AsyncTask<Void, Void, Void>() {
        @Override
        protected Void doInBackground(Void... voids) {
            do {
                try {
                    Thread.sleep(20000);
                    stompClient.connectWith(username, password);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } while (true);
        }
    };

    @Override
    public void onStart(Intent intent, int startId) {
        super.onStart(intent, startId);

        host = intent.getStringExtra("host");
        port = intent.getStringExtra("port");
        username = intent.getStringExtra("username");
        password = intent.getStringExtra("password");
        destination = intent.getStringExtra("destination");

        try {
            stompClient = new StompClient(host, valueOf(port));
            stompClient.connectWith(username, password);
            stompClient.subscribeTo(destination, this);
        } catch (IOException e) {
            e.printStackTrace();
        }

        stayConnected.execute();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    @Override
    public void onMessage(String message) {
        Context context = getApplicationContext();
        CharSequence contentTitle = "New blog post";
        CharSequence contentText = message;

        int icon = R.drawable.icon;
        CharSequence tickerText = message;
        long when = System.currentTimeMillis();

        Notification notification = new Notification(icon, tickerText, when);

        Intent notificationIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://" + host + "/blog"));
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);
        notification.setLatestEventInfo(context, contentTitle, contentText, contentIntent);

        ((NotificationManager) getSystemService(NOTIFICATION_SERVICE)).notify(1, notification);
    }
}
