package com.suryolingo.android;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.microsoft.appcenter.reactnative.push.AppCenterReactNativePushPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
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

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new FBSDKPackage(), new RNVersionCheckPackage(),
          new AppCenterReactNativePushPackage(MainApplication.this),
          new AppCenterReactNativeCrashesPackage(MainApplication.this,
              getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
          new AppCenterReactNativeAnalyticsPackage(MainApplication.this,
              getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
          new AppCenterReactNativePackage(MainApplication.this), new RNFetchBlobPackage(), new RNVersionNumberPackage(),
          new RNSoundPackage(), new RNSensitiveInfoPackage(), new ReactNativeRestartPackage(),
          new LinearGradientPackage(), new RNI18nPackage(), new RNFSPackage(), new RNExitAppPackage(),
          new RNAdMobPackage(), new RNDeviceInfo(), new RNAudioPlayer(),
          new KeyboardInputPackage(this.getApplication()));
    }

    @Override
    protected String getJSMainModuleName() {
      return "artifacts/index.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), true);
  }
}