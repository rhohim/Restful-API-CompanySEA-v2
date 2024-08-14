import requests

endpoint = "https://api.cretivox.com"

def test_call_endpoint():
    response = requests.get(endpoint)
    assert response.status_code == 200

# response = requests.get(endpoint)
# status_code = response.status_code
# print("Status Code:", status_code)

# try:
#     data = response.json()
# except requests.exceptions.JSONDecodeError:
#     print("Response is not in JSON format.")
#     data = response.text

# print("Data:", data)