import requests
import json
import os

auth = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJ3ZXN0ZXVyb3BlIiwic3Vic2NyaXB0aW9uLWlkIjoiZTExODFkYTI2YzhhNGQ5ZDlkYjcwOWM0YzkwNjQxYTciLCJwcm9kdWN0LWlkIjoiQ29nbml0aXZlU2VydmljZXMuUzAiLCJjb2duaXRpdmUtc2VydmljZXMtZW5kcG9pbnQiOiJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9pbnRlcm5hbC92MS4wLyIsImF6dXJlLXJlc291cmNlLWlkIjoiL3N1YnNjcmlwdGlvbnMvMTUzYTFlMTEtYTU5Yi00M2IxLTk5ZWUtNGI2NmVlMjk1ZDljL3Jlc291cmNlR3JvdXBzL1Byb2RFc3NlbnRpYWxzL3Byb3ZpZGVycy9NaWNyb3NvZnQuQ29nbml0aXZlU2VydmljZXMvYWNjb3VudHMvU1RDSVRyYW5zbGF0aW9uQW5zd2VyTmV1cmFsV2VzdEV1cm9wZSIsInNjb3BlIjpbInNwZWVjaHRvaW50ZW50cyIsImh0dHBzOi8vYXBpLm1pY3Jvc29mdHRyYW5zbGF0b3IuY29tLyIsInNwZWVjaHNlcnZpY2VzIiwidmlzaW9uIl0sImF1ZCI6WyJ1cm46bXMuc3BlZWNoIiwidXJuOm1zLmx1aXMud2VzdGV1cm9wZSIsInVybjptcy5taWNyb3NvZnR0cmFuc2xhdG9yIiwidXJuOm1zLnNwZWVjaHNlcnZpY2VzLndlc3RldXJvcGUiLCJ1cm46bXMudmlzaW9uLndlc3RldXJvcGUiXSwiZXhwIjoxNjY4MzYyNTY4LCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMifQ.cLaCyRoulpQjjZAXBQl0HqGbODCbtjQ6IX51wXAFu2E"

"""
await fetch("https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1?", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/ssml+xml",
        "Authorization": {auth},
        "X-MICROSOFT-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        "cache-control": "no-cache",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Pragma": "no-cache"
    },
    "referrer": "https://www.bing.com/",
    "body": "<speak version='1.0' xml:lang='it-IT'><voice xml:lang='it-IT' xml:gender='Male' name='it-IT-DiegoNeural'><prosody rate='-20.00%'>oggi</prosody></voice></speak>",
    "method": "POST",
    "mode": "cors"
});
"""

def get_audio(text):
    url = "https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1?"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/ssml+xml",
        "Authorization": auth,
        "X-MICROSOFT-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        "cache-control": "no-cache",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Pragma": "no-cache"
    }
    body = f"<speak version='1.0' xml:lang='it-IT'><voice xml:lang='it-IT' xml:gender='Male' name='it-IT-DiegoNeural'><prosody rate='-20.00%'>{text}</prosody></voice></speak>".encode('utf-8')
    response = requests.post(url, headers=headers, data=body)
    return response.content

def download_pronunciation(phraseId, text):
    audio = get_audio(text)
    folder = "../src/assets/audio/"

    # Write to folder/{text}.mpeg
    with open(f"{folder}{phraseId}.mpeg", "wb") as f:
        f.write(audio)

# Load phrases from ../src/phrases/italian.json
# format = [{ id, translations: { it } }]
with open("../src/phrases/italian.json", "r") as f:
    phrases = json.load(f)
    for phrase in phrases:
        # if "../src/assets/audio/id.mpeg" exists, skip
        if os.path.exists(f"../src/assets/audio/{phrase['id']}.mpeg"):
            print(f'Skipping {phrase["translations"]["it"]}')
            continue
        print(f'Downloading {phrase["translations"]["it"]}')
        download_pronunciation(phrase["id"], phrase["translations"]["it"])
