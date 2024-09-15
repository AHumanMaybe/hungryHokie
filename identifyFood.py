from openai import OpenAI
import base64
import requests

api_key='sk-abqsuR2AdtqKJybNq_7EtKZqsydrr0X5YCOMUCoilmT3BlbkFJI90UrnrpdQXciLoglRx15jl3juDlj6EQemE9AwexAA'
KEY = "2542052a69012038882cb245348acb45"

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

def getFoodList(image_path):

    # Getting the base64 string
    base64_image = encode_image(image_path)

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
    }

    payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": "name only the food you see in this image and put them in an undecorated list seperated by newlines, respond with no other words or information"
            },
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
            }
            }
        ]
        }
    ],
    "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    foodList = response.json()['choices'][0]['message']['content'].split('\n')
    return foodList

def getNutrition(foodList):

    nutInfo = []

    url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
    headers = {
        'Content-Type': 'application/json',
        'x-app-id': '2ae26761',
        'x-app-key': KEY
    }

    for food in foodList:
        obj = {'query': f'{food}'}
        response = requests.post(url=url, headers=headers, json = obj)
        nutInfo.append({
           'food': f"{response.json()['foods'][0]['food_name']}",
           'kcal': f"{response.json()['foods'][0]['nf_calories']}",
           'carbs': f"{response.json()['foods'][0]['nf_total_carbohydrate']}",
           'prot': f"{response.json()['foods'][0]['nf_protein']}",
           'fat': f"{response.json()['foods'][0]['nf_total_fat']}"
        })

    return nutInfo


def main(image_path):
   foodList = getFoodList(image_path=image_path)
   nutInfo = getNutrition(foodList=foodList)
   return nutInfo
    
