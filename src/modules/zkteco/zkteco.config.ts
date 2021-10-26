import * as Zkteco from 'wrapper-zkteco';
import { v4 as uuid4 } from 'uuid'

export interface ZktecoAttendent {
  id: string
  numberCredential: number
  ip: string
  year: number 
  month: number 
  day: number 
  hour: number
  minute: number 
  second: number
  checkOperative: any
}

export class ZktecoConfig {

  private connection: Zkteco;

  private attendents: ZktecoAttendent[] = [];

  private total: number = 0;

  private ip: string;

  constructor(ip: string) {
    this.ip = ip;
    this.connection = new Zkteco(ip);
  }

  public async generateAttendents(): Promise<boolean> {
    let success = false;
    let payload: any[];
    const result = await this.connection.getAttendents()
    .then(res => {
      success = true;
      payload = res?.assistencias || [];
      this.total = res.total;
      return true;
    })
    .catch(() => false);
    // recorrer datos
    await payload.forEach(asistance => {
      this.attendents.push({
        id: uuid4(),
        numberCredential: asistance.NumeroCredencial,
        ip: this.ip,
        year: asistance.Anio,
        month: asistance.Mes,
        day: asistance.Dia,
        hour: asistance.Hora,
        minute: asistance.Minuto,
        second: asistance.Segundo,
        checkOperative: asistance.MarcajeOperativo,
      } as ZktecoAttendent)
    });
    // response
    return result;
  }

  public getAttendents(): ZktecoAttendent[] {
    return this.attendents;
  }

  public getTotal(): number {
    return this.total;
  }

}