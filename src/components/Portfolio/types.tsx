export interface Portfolio {
  allAssets: string[],
  dates: DateAssets[]
}

export interface DateAssets {
  date: Date
  assets: AssetAtDate[]
}

export interface AssetAtDate {
  asset: Asset
  amount: number
  // GBP value
  //assetValue: number
}

export interface Asset {
  name: String
  code: string
}

export function createInitialPortfolio():Portfolio {
  return {
    allAssets: [ "GBP", "EUR"],
    dates: [
      { 
        date: new Date(), 
        assets: [
          { asset: { name: "Pound", code: "GBP"}, amount:1000 },
          { asset: { name: "Euro", code: "EUR"}, amount:2000 }
        ]
      }
    ]
  }
}