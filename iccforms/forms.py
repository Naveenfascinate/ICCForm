from flask import Flask, render_template, request
import sqlite3
import json
import ast

# Setting Static files URL paths
forms = Flask(__name__,static_url_path='/static')
forms.config["TEMPLATES_AUTO_RELOAD"] = True

# HomePage
@forms.route('/')
@forms.route('/home')
def homepage():
    return render_template('index.html')


# Home page submit functionality
@forms.route("/homesubmit", methods=['POST', 'GET'])
def homeSubmit():
    # Getting data using POST method
    if request.method == 'POST':
        # Connecting sqlLite Database
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()

        # Getting data from user
        formData = request.get_json()
        print(formData.keys())
        formName = formData["formName"]

        #formName = formData['formName']

        # Inserting data to database
        tabelcmd = 'INSERT INTO userforms (form_name,form_data) values ("' + formName + '","' \
                   + str(formData) + '")'
        cursor.execute(tabelcmd)
        con.commit()

        return "success"

# Register page
@forms.route('/register',methods=['POST', 'GET'])
def registerpage():

    global jsonFormData

    # Getting data using POST method
    if request.method == 'POST':
        columnNames = []
        Data = request.form.getlist("getdata[]")
        formName = Data[1]

        # Connecting sqlLite Database
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()

        # Fetching data from database
        selectCmd = "SELECT form_data,response_data FROM userforms WHERE form_name = '"+formName+"'"
        tabelData = cursor.execute(selectCmd)

        # Converting data into Json Format
        for i in tabelData:
            jsonData = json.dumps(i[0])
            jsonFormData = json.loads(jsonData)

        return ({'formData':jsonFormData})
    return render_template('formRegisteration.html')

# Register page submit functionality
@forms.route("/submit", methods=['POST', 'GET'])
def submit():
    # Getting data using POST method
    if request.method == 'POST':
        result ={}

        # Connecting sqlLite Database
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()

        # Getting data from client side
        data = request.form.get("resultdata")
        data = ast.literal_eval(data)
        questions = request.form.getlist("question[]")
        questionTypes = request.form.getlist("questionType[]")
        formName = request.form.get("getdata")

        # Fetching data from database
        selectCmd = "SELECT response_data FROM userforms WHERE form_name = '" + formName + "'"
        tabelData = cursor.execute(selectCmd)

        for i in tabelData:
            if i[0] == None:
                for j in range(len(questions)):
                    result[questions[j]]=[data[j]]
            else:
                #temp = json.dumps(i[0])
                result = i[0].replace("\'", "\"")
                result = json.loads(result)
                for j in range(len(questions)):
                    result[questions[j]].append(data[j])

        # Updating registered data in database
        tabelcmd = 'UPDATE userforms SET response_data = "'+str(result)+'" WHERE form_name = "'+formName+'"'
        cursor.execute(tabelcmd)
        con.commit()
        return ("success")

# Enquiry page
@forms.route("/enquiries", methods=['POST', 'GET'])
def enquiry():
    # Getting data using POST method
    if request.method == 'POST':

        # Getting form name
        Data = request.form.getlist("getdata[]")
        formName = Data[1]

        # Connecting sqlLite Database
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()

        # Fetching data from database
        selectCmd = "SELECT response_data FROM userforms WHERE form_name = '"+formName+"'"
        tabelData = cursor.execute(selectCmd)

        for i in tabelData:
            jsonData = json.dumps(i[0])
            jsonFormData = json.loads(jsonData)

        # Converting data into Json Format
        return ({'formData':jsonFormData})
    return render_template('enquiries.html')

if __name__ == "__main__":
    forms.jinja_env.auto_reload = True
    forms.config['TEMPLATES_AUTO_RELOAD'] = True
    forms.run(debug=True)