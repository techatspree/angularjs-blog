package de.akquinet.aerogear.android.activities;

import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import de.akquinet.aerogear.android.services.MessagingService;
import de.akquinet.android.roboject.RobojectActivity;
import de.akquinet.android.roboject.annotations.InjectLayout;
import de.akquinet.android.roboject.annotations.InjectView;

@InjectLayout("start")
public class StartActivity extends RobojectActivity {
    @InjectView EditText hostText;
    @InjectView EditText portText;
    @InjectView EditText usernameText;
    @InjectView EditText passwordText;
    @InjectView EditText destinationText;
    @InjectView Button startButton;

    @Override
    public void onReady() {
        startButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent();
                intent.setClass(getApplicationContext(), MessagingService.class);
                intent.putExtra("host", hostText.getText().toString());
                intent.putExtra("port", portText.getText().toString());
                intent.putExtra("username", usernameText.getText().toString());
                intent.putExtra("password", passwordText.getText().toString());
                intent.putExtra("destination", destinationText.getText().toString());
                startService(intent);
                finish();
            }
        });
    }
}
