export interface Portfolio {
  allAssets: string[],
  dates: DateAssets[]
}

export interface DateAssets {
  date: Date
  assets: AssetAtDate[]
}

// TODO: rename AssetAmount or AssetQuantity
export interface AssetAtDate {
  asset: Asset
  amount: number
  // GBP value
  //assetValue: number
}

export interface Asset {
  name: string
  code: string
}

export function createInitialPortfolio():Portfolio {
  return {
    allAssets: [ "GBP", "EUR"],
    dates: [
      { 
        date: new Date(), 
        assets: [
          { asset: { name: "Pound", code: "GBP"}, amount:1500 },
          { asset: { name: "Euro", code: "EUR"}, amount:4000 }
        ]
      },
      {
        date: new Date(2021, 2, 15),
        assets: [
          { asset: { name: "Pound", code: "GBP"}, amount:1000 },
          { asset: { name: "Euro", code: "EUR"}, amount:2000 }
        ]
      }
    ]
  }
}