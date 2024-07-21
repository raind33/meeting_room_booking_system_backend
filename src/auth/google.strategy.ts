import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { SocksProxyAgent } from 'socks-proxy-agent';

// const Agent = new SocksProxyAgent('socks5://127.0.0.1:7890');
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      scope: ['email', 'profile'],
      clientID: configService.get('google_client_id'),
      clientSecret: configService.get('google_client_secret'),
      callbackURL: configService.get('google_callback_url'),
    });
    // this._oauth2.setAgent(Agent);
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    return user;
  }
}
