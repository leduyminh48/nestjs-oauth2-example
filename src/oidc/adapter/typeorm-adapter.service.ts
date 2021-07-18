import { Session } from '../entities/Session.entity';
import { AccessToken } from '../entities/AccessToken.entity';
import { AuthorizationCode } from '../entities/AuthorizationCode.entity';
import { RefreshToken } from '../entities/RefreshToken.entity';
import { DeviceCode } from '../entities/DeviceCode.entity';
import { ClientCredentials } from '../entities/ClientCredentials.entity';
import { Client } from '../entities/Client.entity';
import { InitialAccessToken } from '../entities/InitialAccessToken.entity';
import { RegistrationAccessToken } from '../entities/RegistrationAccessToken.entity';
import { Interaction } from '../entities/Interaction.entity';
import { ReplayDetection } from '../entities/ReplayDetection.entity';
import { PushedAuthorizationRequest } from '../entities/PushedAuthorizationRequest.entity';
import { Grant } from '../entities/Grant.entity';
import { getRepository, Repository } from 'typeorm';
import { BaseOidcEntity } from '../entities/BaseOidcEntity';
import { BaseGrantableEntity } from '../entities/BaseGrantableEntity';

const models = new Map([
  ['Session', Session],
  ['AccessToken', AccessToken],
  ['AuthorizationCode', AuthorizationCode],
  ['RefreshToken', RefreshToken],
  ['DeviceCode', DeviceCode],
  ['ClientCredentials', ClientCredentials],
  ['Client', Client],
  ['InitialAccessToken', InitialAccessToken],
  ['RegistrationAccessToken', RegistrationAccessToken],
  ['Interaction', Interaction],
  ['ReplayDetection', ReplayDetection],
  ['PushedAuthorizationRequest', PushedAuthorizationRequest],
  ['Grant', Grant],
]);

export class TypeOrmAdapter {
  private model: Repository<BaseOidcEntity>;

  constructor(private name) {
    this.model = getRepository(models.get(name));
  }

  async upsert(id, data, expiresIn) {
    await this.model.save({
      id,
      data,
      ...(data.grantId ? { grantId: data.grantId } : undefined),
      ...(data.userCode ? { userCode: data.userCode } : undefined),
      ...(data.uid ? { uid: data.uid } : undefined),
      ...(expiresIn
        ? { expiresAt: new Date(Date.now() + expiresIn * 1000) }
        : undefined),
    });
  }

  async find(id: string) {
    const found = await this.model.findOne(id);
    if (!found) return undefined;
    return {
      ...found.data,
      ...(found.consumedAt ? { consumed: true } : undefined),
    };
  }

  async findByUserCode(userCode: string) {
    const found = await (this.model as Repository<DeviceCode>).findOne({
      where: { userCode },
    });
    if (!found) return undefined;
    return {
      ...found.data,
      ...(found.consumedAt ? { consumed: true } : undefined),
    };
  }

  async findByUid(uid: string) {
    const found = await this.model.findOne({ where: { uid } });
    if (!found) return undefined;
    return {
      ...found.data,
      ...(found.consumedAt ? { consumed: true } : undefined),
    };
  }

  async destroy(id) {
    await this.model.softDelete(id);
  }

  async consume(id: string) {
    await this.model.update(id, { consumedAt: new Date() });
  }

  async revokeByGrantId(grantId: string) {
    await (this.model as Repository<BaseGrantableEntity>).softDelete({
      grantId,
    });
  }

  static async connect() {
    return Promise.resolve(true);
  }
}
