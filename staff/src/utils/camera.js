export const stopVideoStreams = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({video: true})

    for (let track of stream.getTracks()) {
      try {
        await track.stop();
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error(e);
  }
}