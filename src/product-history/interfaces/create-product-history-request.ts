export interface ICreateProductHistoryRequest {
    productHistoryId: number
    quantity: number
    used: number
    expiryDate: string
    warehouseId: number
    productId: number
}