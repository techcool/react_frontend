import MicRecorder from 'mic-recorder-to-mp3';

function initAudioRecord() {
  this.Mp3Recorder = new MicRecorder({
    bitRate: 128
  });
}

async function startRecording() {
  const { Mp3Recorder } = this
  try {
    await Mp3Recorder.start()
  } catch (error) {
    console.error(error);
  }
}

async function stopRecording() {
  const { Mp3Recorder } = this
  try {
    const [buffer, blob] = await Mp3Recorder.stop().getMp3();
    const stream=blob.stream()
    // const reader=stream.getReader()
    // reader.read().then(({done,value})=>console.log(value))
    return blob;
  } catch (error) {
    console.log(error)
  }
}

const audioRecording = {
  initAudioRecord,
  startRecording,
  stopRecording,
}
export default audioRecording;