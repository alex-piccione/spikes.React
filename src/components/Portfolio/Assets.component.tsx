import React from "react"
import { Asset, DateAssets } from "./types"

interface AssetProps {
  asset:Asset
}

export class Assets extends React.Component<AssetProps, DateAssets> {
  constructor(props:AssetProps) {
    super(props)
  }

  render() {
    return <div className="card">Asset: {this.state.date}</div>
  }
}