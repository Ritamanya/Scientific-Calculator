package com.ritamanyasapps.calculator;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        webView = findViewById(R.id.wb);

        // --- Configure WebView Settings ---

        WebSettings webSettings = webView.getSettings();

        // 1. Enable JavaScript (Crucial for your JS files to run)
        webSettings.setJavaScriptEnabled(true);

        // 2. Enable DOM Storage (localStorage, sessionStorage) if your website uses it
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        //webSettings.setUseWideViewPort(true);
        //webSettings.setLoadWithOverviewMode(true);
        /*webSettings.setBuiltInZoomControls(true);
        webSettings.setSupportZoom(true);*/

        webView.loadUrl("file:///android_asset/index.html");
        //webView.loadUrl("https://google.com");

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}