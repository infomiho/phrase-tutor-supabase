import json
#  Load ../src/phrases/italian.json
# Then convert from format:
# [
#   ["english", "italian"]
# ]
# to format:
# [
#   {
#     "id": 1,
#     "group": "general",
#     "translations": { "en": "english", "it": "italian" }
#   }
# ]
# Then save to ../src/phrases/italian2.json
with open('../src/phrases/italian.json') as f:
    data = json.load(f)
    for i in range(len(data)):
        data[i] = {
            "id": i + 1,
            "group": "general",
            "translations": { "en": data[i][0], "it": data[i][1] }
        }
    with open('../src/phrases/italian2.json', 'w') as f2:
        json.dump(data, f2)
