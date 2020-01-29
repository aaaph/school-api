import { JWTConfig } from "config/index";
import { Account, Session } from "models/index";
import { IJWTPair, IJWTPayload } from "types/index";

import { sign, verify } from "jsonwebtoken";
import { getManager, Repository } from "typeorm";

const token = (id: string, life: number): string => {
  const payload: IJWTPayload = {
    id: id,
    alg: JWTConfig.alg
  };
  return sign(payload, JWTConfig.secret, {
    expiresIn: life
  });
};

const createAccess = async (id: string): Promise<string> => {
  return token(id, JWTConfig.accessLife);
};

const createRefresh = async (account: Account): Promise<string> => {
  const refresh = token(account.id, JWTConfig.refreshLife);
  const SessionRepository: Repository<Session> = getManager().getRepository(
    Session
  );
  const session: Session = await SessionRepository.findOne({ account });

  const sessionToSave = new Session();
  sessionToSave.account = account;
  sessionToSave.token = refresh;

  if (!session) {
    //create new session for user and save in db
    await SessionRepository.save(sessionToSave);
  } else {
    //update current session
    sessionToSave.id = session.id;
    await SessionRepository.save(sessionToSave);
  }
  return refresh;
};

const UNIXSeconds = async (): Promise<number> => {
  return Math.round(new Date().getTime() / 1000);
};
class JWTService {
  public static async createPair(account: Account): Promise<IJWTPair> {
    //here need create access token + refresh token and return in IJWTPair
    const access = await createAccess(account.id);
    const refresh = await createRefresh(account);
    const expiresIn = (await UNIXSeconds()) + JWTConfig.accessLife;
    const pair: IJWTPair = {
      accessToken: access,
      refreshToken: refresh,
      expiresIn: expiresIn
    };
    return pair;
  }

  public static async getPayload(token: string): Promise<IJWTPayload> {
    try {
      const body = await verify(token, JWTConfig.secret);
      return <IJWTPayload>body;
    } catch (err) {
      throw err;
    }
  }
}
export { JWTService };
