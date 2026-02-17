import { DetalleVentaInterface } from "./detalle-venta-interface";

export interface VentaInterface {
        idVenta?: number,
        numeroDocumento?: string,
        tipoPago: string,
        fechaRegistro?: string,
        totalTexto: string,
        detalleVenta: DetalleVentaInterface[]
}
