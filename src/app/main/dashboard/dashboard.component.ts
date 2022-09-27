import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  file!: any;
  message!: any;
  password!: any;
  confirmpassword!: any;
  encryptedMessage!: any;
  decryptedMessage!: any;

  constructor() { }

  ngOnInit(): void {
  }

  encrypt() {
    this.encryptedMessage = CryptoJS.AES.encrypt(
      this.message.trim(), this.password.trim()
    ).toString();
    const a = document.createElement("a");
    const archivo = new Blob([this.encryptedMessage], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = 'encrypt.txt';
    a.click();
    URL.revokeObjectURL(url);

    this.message = this.password = ''
  }

  decrypt() {
    // console.log(this.file)
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.encryptedMessage = fileReader.result;
    }
    fileReader.readAsText(this.file);

    const pro1 = new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve(this.decryptedMessage)
      }, 1500)
    })

    pro1
      .then(() => {
        this.decryptedMessage = CryptoJS.AES.decrypt(
          this.encryptedMessage, this.confirmpassword.trim()
        ).toString(CryptoJS.enc.Utf8);
        alert(this.decryptedMessage)
      })
      .catch(() => console.log('error'))
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}
