package com.suryolingo.android;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import android.app.Application;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rnfs.RNFSPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.sh3rawi.RNAudioPlayer.RNAudioPlayer;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.wix.reactnativekeyboardinput.KeyboardInputPackage;
import com.sbugert.rnadmob.RNAdMobPackage;

import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.fabric.sdk.android.Fabric;
import com.crashlytics.android.Crashlytics;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new RNFirebasePackage(),
          new RNFirebaseCrashlyticsPackage(), new RNFirebaseAnalyticsPackage(), new RNFirebaseMessagingPackage(),
          new RNVersionCheckPackage(), new RNFetchBlobPackage(), new RNVersionNumberPackage(), new RNSoundPackage(),
          new RNSensitiveInfoPackage(), new ReactNativeRestartPackage(), new LinearGradientPackage(),
          new RNI18nPackage(), new RNFSPackage(), new RNExitAppPackage(), new RNAdMobPackage(), new RNDeviceInfo(),
          new RNAudioPlayer(), new FBSDKPackage(mCallbackManager), new KeyboardInputPackage(this.getApplication()));
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());

    FacebookSdk.sdkInitialize(getApplicationContext());
    SoLoader.init(this, /* native exopackage */ false);

    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), true);
  }
}
