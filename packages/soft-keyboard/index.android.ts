import { Application, Screen, AndroidApplication } from '@nativescript/core';
import { SoftKeyboardCallbackFnType } from '.';

let softKeyboardCallback = null;
let softKeyboardProvider = null;

Application.android.on(AndroidApplication.activityCreatedEvent, (args) => {
  softKeyboardProvider = new (com as any).hold1.keyboardheightprovider.KeyboardHeightProvider(args.activity);
  const listener = new (com as any).hold1.keyboardheightprovider.KeyboardHeightProvider.KeyboardListener({
    onHeightChanged: (height: number) => {
      if (softKeyboardCallback) {
        softKeyboardCallback(height / Screen.mainScreen.scale);
      }
    }
  });
  softKeyboardProvider.addKeyboardListener(listener);
});
Application.android.on(AndroidApplication.activityPausedEvent, () => {
  if (softKeyboardProvider) {
    softKeyboardProvider.onPause();
  }
});
Application.android.on(AndroidApplication.activityResumedEvent, () => {
  if (softKeyboardProvider) {
    softKeyboardProvider.onResume();
  }
});

export function registerSoftKeyboardCallback(callback: SoftKeyboardCallbackFnType) {
  softKeyboardCallback = callback;
}
