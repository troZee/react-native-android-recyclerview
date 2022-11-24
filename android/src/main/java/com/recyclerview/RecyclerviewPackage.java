package com.recyclerview;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

//public class RecyclerviewPackage implements ReactPackage {
//  @Override
//  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
//    return Collections.emptyList();
//  }
//
//  @Override
//  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
//    return Arrays.<ViewManager>asList(new RecyclerviewViewManager());
//  }
//}

public class RecyclerviewPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> nativeModules = new ArrayList<>();
    nativeModules.add(new RNRecycleviewModule(reactContext));
    return nativeModules;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new RNRecycleviewManager(),
      new RNRecycleviewItemviewManager()
    );
  }
}
