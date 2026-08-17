package com.svetlana.avatar

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this)
        setContentView(webView)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.mediaPlaybackRequiresUserGesture = false
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = false
        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val url = request.url
                return url.scheme != "file" || url.host != null ||
                    !url.path.orEmpty().startsWith("/android_asset/svetlana/")
            }
        }
        webView.addJavascriptInterface(NativeBridge(webView), "SvetlanaNative")
        webView.loadUrl("file:///android_asset/svetlana/index.html")
    }

    override fun onPause() {
        super.onPause()
        webView.evaluateJavascript(
            "window.SvetlanaBridge && window.SvetlanaBridge.interrupt && window.SvetlanaBridge.interrupt('android-pause')", null
        )
        webView.onPause()
    }

    override fun onResume() { super.onResume(); webView.onResume() }

    override fun onDestroy() {
        webView.removeJavascriptInterface("SvetlanaNative")
        webView.destroy()
        super.onDestroy()
    }

    class NativeBridge(private val webView: WebView) {
        private val allowed = setOf(
            "ai.speech", "ai.cancel", "ai.stream.chunk", "ai.stream.end",
            "avatar.lookAt", "avatar.emotion", "avatar.stop", "host.ping"
        )
        @android.webkit.JavascriptInterface
        fun command(json: String): String = try {
            val obj = JSONObject(json)
            val type = obj.optString("type")
            if (type !in allowed) JSONObject().put("ok", false).put("error", "command_not_allowed").toString()
            else {
                val quoted = JSONObject.quote(obj.toString())
                webView.post { webView.evaluateJavascript(
                    "window.SvetlanaAndroidCommandV10 && window.SvetlanaAndroidCommandV10($quoted)", null
                ) }
                JSONObject().put("ok", true).toString()
            }
        } catch (_: Exception) {
            JSONObject().put("ok", false).put("error", "invalid_command").toString()
        }
    }
}
