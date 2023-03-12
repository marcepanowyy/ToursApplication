import { Component } from '@angular/core';
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  fb = faFacebook
  yt = faYoutube;
  ig = faInstagram;
  tw = faTwitter
}
