type MetarData = {
    "metar_id": number,
    "icaoId": string,
    "receiptTime": string,
    "obsTime": number,
    "reportTime": string,
    "temp": number,
    "dewp": number,
    "wdir": number,
    "wspd": number,
    "wgst": number,
    "visib": string,
    "altim": number,
    "slp": number,
    "qcField": number,
    "wxString": string,
    "presTend": number,
    "maxT": number,
    "minT": number,
    "maxT24": number,
    "minT24": number,
    "precip": number,
    "pcp3hr": number,
    "pcp6hr": number,
    "pcp24hr": number,
    "snow": number,
    "vertVis": number,
    "metarType": string,
    "rawOb": string,
    "mostRecent": number,
    "lat": number,
    "lon": number,
    "elev": number,
    "prior": number,
    "name": string,
    "clouds": [
      {
        "cover": string,
        "base": number,
      },
      {
        "cover": string,
        "base": number,
      }
    ]
  }

  type MetarResponse = MetarData[];