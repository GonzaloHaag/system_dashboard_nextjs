export type PedidoStatus = 'pending' | 'in-progress' | 'completed'

export interface Pedido {
  id: string
  title: string
  customer: string
  status: PedidoStatus
  date: string
}

export interface Column {
  id: PedidoStatus
  title: string
}

