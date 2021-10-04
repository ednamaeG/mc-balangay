import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;
const CACHE_FOLDER = 'CACHED_IMG';

@Component({
  selector: 'app-cached-image',
  templateUrl: './cached-image.component.html',
  styleUrls: ['./cached-image.component.scss'],
})
export class CachedImageComponent implements OnInit {
  _src = ''
  @Input('type') type;

  logoStyle:any = {
    'height': '80px',
    'width': '80px',
    'object-fit': 'contain'
  }
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  @Input()
  set src(imgUrl: string) {
    console.log(imgUrl)
    const imageName = imgUrl.split('/').pop();
    const fileType = imageName.split('.').pop();

    Filesystem.readFile({
      directory: FilesystemDirectory.Cache,
      path: `${CACHE_FOLDER}/${imageName}`
    }).then((readFile) => {
      console.log("Local gile", readFile);
      this._src = `data:image${fileType};base64,${readFile.data}`;
    }).catch(async (e) => {
      // write the file
      await this.storeImg(imgUrl, imageName);

      Filesystem.readFile({
        directory: FilesystemDirectory.Cache,
        path: `${CACHE_FOLDER}/${imageName}`
      }).then((readFile) => {
        this._src = `data:image${fileType};base64,${readFile.data}`;

      })
    })
  }

  async storeImg(url, path) {

    const res = await fetch(url)
    const blob = await res.blob()

    const based64Data = await this.convertBlobToBase64(blob) as string;

    const savedFile = await Filesystem.writeFile({
      path: `${CACHE_FOLDER}/${path}`,
      data: based64Data,
      directory: FilesystemDirectory.Cache
    })
  }

  async convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this._src);
  }

}
