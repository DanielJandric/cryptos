#!/usr/bin/env python3

"""
Script de récupération des prix BTC depuis yfinance.
Génère deux fichiers JSON dans public/data/ :
 - btc-history.json : historique quotidien (t=epoch ms, c=close)
 - spot.json : dernier prix spot (price, ts)

Exécution:
  python scripts/fetch_btc.py
"""

import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf


def epoch_ms(dt) -> int:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return int(dt.timestamp() * 1000)


def fetch_history() -> dict:
    df = yf.download(
        "BTC-USD",
        period="max",
        interval="1d",
        auto_adjust=False,
        progress=False,
        threads=True,
    )
    df = df.dropna()
    data = []
    for ts, row in df.iterrows():
        # ts est un Timestamp (tz-aware ou naive)
        dt = ts.to_pydatetime()
        data.append({"t": epoch_ms(dt), "c": float(row.get("Close", 0.0))})
    return {
        "source": "yfinance",
        "symbol": "BTC-USD",
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "data": data,
    }


def fetch_spot() -> dict:
    # Tentative 1: 1m sur 1 jour
    spot = yf.download("BTC-USD", period="1d", interval="1m", progress=False, threads=True)
    if spot.empty:
        # Secours : 1h sur 5 jours
        spot = yf.download("BTC-USD", period="5d", interval="1h", progress=False, threads=True)
    price = None
    ts = None
    if not spot.empty:
        last = spot.tail(1)
        price = float(last["Close"].iloc[0])
        ts = epoch_ms(last.index[0].to_pydatetime())
    else:
        # Ultime repli via history sur Ticker
        tk = yf.Ticker("BTC-USD")
        hist = tk.history(period="1d")
        if not hist.empty:
            price = float(hist["Close"].iloc[-1])
            ts = epoch_ms(hist.index[-1].to_pydatetime())
    if price is None:
        raise RuntimeError("Impossible de récupérer le prix spot BTC-USD")
    return {"symbol": "BTC-USD", "price": price, "ts": ts}


def main():
    root = Path(__file__).resolve().parents[1]
    out_dir = root / "public" / "data"
    out_dir.mkdir(parents=True, exist_ok=True)

    history = fetch_history()
    (out_dir / "btc-history.json").write_text(json.dumps(history), encoding="utf-8")

    spot = fetch_spot()
    (out_dir / "spot.json").write_text(json.dumps(spot), encoding="utf-8")

    # NASDAQ (^IXIC)
    df_ndq = yf.download("^IXIC", period="max", interval="1d", auto_adjust=False, progress=False, threads=True).dropna()
    ndq = {
        "source": "yfinance",
        "symbol": "^IXIC",
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "data": [{"t": epoch_ms(ts.to_pydatetime()), "c": float(r.get("Close", 0.0))} for ts, r in df_ndq.iterrows()],
    }
    (out_dir / "nasdaq-history.json").write_text(json.dumps(ndq), encoding="utf-8")

    print("Wrote:", out_dir / "btc-history.json")
    print("Wrote:", out_dir / "spot.json")


if __name__ == "__main__":
    main()


