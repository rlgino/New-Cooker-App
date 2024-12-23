import { PushNotifications } from '@capacitor/push-notifications';
import { updatePushToken } from './database';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';

export const addListeners = async (phoneNumber: string) => {
    if (!Capacitor.isNativePlatform()) return;
    await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        updatePushToken(phoneNumber, token.value)
    });

    await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
}

export const registerNotifications = async () => {
    if (!Capacitor.isNativePlatform()) return;
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
}

export const getDeliveredNotifications = async () => {
    if (!Capacitor.isNativePlatform()) return;
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
}