import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export function usePhotoGallery() {
  const takePhoto = async (): Promise<Blob> => {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 100,
      resultType: CameraResultType.Uri,
    });
    return base64FromPath(photo.webPath!)
  };

  async function base64FromPath(path: string): Promise<Blob> {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve) => {
      resolve(blob)
    });
  }

  return {
    takePhoto,
  };
}
