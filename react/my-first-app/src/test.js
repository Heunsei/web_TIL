import React from 'react';
import mime from 'mime/lite';

class VideoDownloader extends React.Component {
  handleDownloadClick = async () => {
    const videoUrl = 'http://localhost:4443/openvidu/recordings/ses_UEEtaI07m3/ses_UEEtaI07m3.mp4';
    const response = await fetch(videoUrl);
    const blob = await response.blob()
    console.log(response)
    var url = window.URL.createObjectURL(this.blob);

    var a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = url;
    a.download = 'ses_UEEtaI07m3.mp4'
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleDownloadClick}>영상 다운로드</button>
      </div>
    );
  }
}

export default VideoDownloader;