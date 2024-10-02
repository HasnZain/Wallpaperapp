package com.wallpaperapp

import android.app.WallpaperManager
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.util.DisplayMetrics
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import java.io.IOException

class WallpaperModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "WallpaperManager"
  }

  @ReactMethod
  fun setWallpaper(resourceName: String, type: Int, successCallback: Callback, errorCallback: Callback) {
    try {
      val resourceId = reactApplicationContext.resources.getIdentifier(resourceName, "drawable", reactApplicationContext.packageName)
      if (resourceId != 0) {
        val wallpaperManager = WallpaperManager.getInstance(reactApplicationContext)
        val originalBitmap = BitmapFactory.decodeResource(reactApplicationContext.resources, resourceId)

        // Get screen dimensions
        val windowManager = reactApplicationContext.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val displayMetrics = DisplayMetrics()
        windowManager.defaultDisplay.getMetrics(displayMetrics)
        val screenWidth = displayMetrics.widthPixels
        val screenHeight = displayMetrics.heightPixels

        // Resize the bitmap to fit the screen
        val resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, screenWidth, screenHeight, true)

        when (type) {
          1 -> wallpaperManager.setBitmap(resizedBitmap, null, true, WallpaperManager.FLAG_SYSTEM)
          2 -> wallpaperManager.setBitmap(resizedBitmap, null, true, WallpaperManager.FLAG_LOCK)
          3 -> {
            wallpaperManager.setBitmap(resizedBitmap, null, true, WallpaperManager.FLAG_SYSTEM)
            wallpaperManager.setBitmap(resizedBitmap, null, true, WallpaperManager.FLAG_LOCK)
          }
          else -> errorCallback.invoke("Invalid type")
        }

        successCallback.invoke("Wallpaper set successfully")
      } else {
        errorCallback.invoke("Resource not found")
      }
    } catch (e: IOException) {
      errorCallback.invoke("Failed to set wallpaper: ${e.message}")
    }
  }
}
