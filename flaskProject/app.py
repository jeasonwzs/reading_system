import json
from model import *
import logging

from flask import Flask, request, jsonify, make_response, render_template
import mysql.connector
from flask_cors import CORS

app = Flask(__name__,template_folder='./static/templates')

# 允许来自 http://example.com 的跨域请求
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:63342"}},supports_credentials=True)

# 数据库连接参数
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "root",
    "database": "reading_platform",
    # "auth_plugin": "mysql_native_password"  # 添加这一行
}

try:
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    logging.info('数据库连接成功')

    # 其余的数据库操作代码...

except Exception as e:
    logging.error(f'数据库连接失败，错误信息: {str(e)}')
    response = {
        'code': 0,
        'msg': '查询出错',
        'data': []
    }


# 个性化界面 -> 书籍推荐
@app.route('/recommendBook', methods=['GET'])
def recommendBook():
    stu_id = request.args.get('stuId', type=int)
    _,idandname=recommend_least_similar_books(stu_id,top_k=200)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        data = []

        for key in idandname:
            key = int(key)
            # app.logger.debug(key)
            query = f"SELECT * FROM book_info WHERE book_id = {key}"
            cursor.execute(query)

            # 获取查询结果
            result = cursor.fetchone()
            # app.logger.debug(result)

            if result:
                data.append({
                 "bookId":result[0],
                 "name": result[1],
                 "authorCountry": result[2],
                 "bookPeriod": result[3],
                 "bookType": result[4],
                 "bookContentTheme": result[5],
                 "readabilityRange": result[6],
                 "wordCount": result[7],
                 "mainlyAffectsCharacter": result[8],
                 "specialAttention": result[9]}
                )
        response = {
            'code':1,
            'msg':'查询成功',
            'data':data
        }
    except Exception as e:
        response = {
            'code': 0,
            'msg': '查询出错',
            'data': []
        }
    return str(response)

# 个性化界面 -> 点击书籍获取书籍详细信息
@app.route('/bookDetail', methods=['GET'])
def bookDetail():
    bookId = request.args.get('bookId', None)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # 查询书籍信息
        query = f"SELECT * FROM book_info WHERE book_id = {bookId}"
        cursor.execute(query)
        book_info = cursor.fetchone()

        if book_info:
            code = 1
            msg = "查询成功"
            data = {
                "book_id": book_info[0],
                "bookName": book_info[1],
                "author_country": book_info[2],
                "book_period": book_info[3],
                "book_type": book_info[4],
                "book_content_theme": book_info[5],
                "readability_range": book_info[6],
                "word_count": book_info[7],
                "mainly_affects_character": book_info[8],
                "special_attention": book_info[9]
            }
            response = {
                'code': 1,
                'msg': '查询成功',
                'data': data
            }
        else:
            response = {
                'code': 0,
                'msg': '查询失败',
                'data': []
            }

        cursor.close()
        connection.close()
    except Exception as e:
        response = {
            'code': 0,
            'msg': '查询出错',
            'data': []
        }

    return str(response)

# 个性化界面 -> 根据当前学生的账户获取其推荐伙伴
@app.route('/friRecommend', methods=['GET'])
def friRecommend():
    # 获取学生ID
    # data = request.json
    stu_id = request.args.get('stuId', type=int)
    _,friend=recommend_same_type_user(stu_id)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        data = []

        for key in friend:
            key = int(key)
            query = f"SELECT * FROM student WHERE student_id = {key}"
            cursor.execute(query)

            # 获取查询结果
            result = cursor.fetchone()
            # app.logger.debug(result)

            if result:
                data.append({"studentId": result[20], "studentName": result[1], "school": result[18], "class": result[19], "sex": result[21], "nation": result[22], "birth": result[23]})
        response = {
            'code':1,
            'msg':'查询成功',
            'data':data
        }
    except Exception as e:
        response = {
            'code': 0,
            'msg': '查询出错',
            'data': []
        }
    return str(response)

# 个性化界面 -> 推荐学习方法
@app.route('/recommendMethod')
def recommendMethod():
    return recommend_method()

# 个人界面 -> 下方的阅读偏好
@app.route('/perfer_statistics', methods=['GET'])
def statistics():
    stu_id = request.args.get('stuId', type=int)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        query = f"SELECT * FROM student_statistics WHERE student_id = {stu_id};"
        cursor.execute(query)

        statistics_info = cursor.fetchall()
        # app.logger.debug(statistics_info)

        cursor.close()
        connection.close()

        if statistics_info:
            data = {
                "masterpiece":statistics_info[0][2],
                "traditional_chinese_culture": statistics_info[0][3],
                "others": statistics_info[0][4],
                "science_fantasy": statistics_info[0][5],
                "red_literature": statistics_info[0][6],
                "classical_chinese": statistics_info[0][7],
            }
            response = {
                'code': 1,
                'msg': '查询成功',
                'data': data
            }
        else:
            response = {
                'code': 0,
                'msg': '查询失败，未找到相关书籍。',
                'data': []
            }
    except Exception as e:
        response = {
            'code': 0,
            'msg': '查询出错',
            'data': []
        }

    return str(response)

# 个人界面 -> 阅读小时
@app.route('/reading_hour', methods=['GET'])
def reading_hour():
    stu_id = request.args.get('stuId', type=int)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        query = f"SELECT * FROM student_statistics WHERE student_id = {stu_id};"
        cursor.execute(query)

        statistics_info = cursor.fetchall()
        # app.logger.debug(statistics_info)

        cursor.close()
        connection.close()

        if statistics_info:
            data = {
                "zero_four":statistics_info[0][8],
                "four_eight": statistics_info[0][9],
                "eight_twelve": statistics_info[0][10]
            }
            response = {
                'code': 1,
                'msg': '查询成功',
                'data': data
            }
        else:
            response = {
                'code': 0,
                'msg': '查询失败，未找到相关书籍。',
                'data': []
            }
    except Exception as e:
        response = {
            'code': 0,
            'msg': '查询出错',
            'data': []
        }

    return str(response)

# 个人界面 -> 品格
@app.route('/personality', methods=['GET'])
def personality():
    # 获取学生ID
    # data = request.json
    stu_id = request.args.get('stuId', type=int)

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        query = f"SELECT * FROM student_score WHERE student_id = {stu_id};"
        cursor.execute(query)
        student_score_info = cursor.fetchall()
        # app.logger.debug('student_score_info')
        # app.logger.debug(student_score_info)

        cursor.close()
        connection.close()

        if student_score_info:
            # data = {
            #     "student_id":student_score_info[0][0],
            #     "psychology": student_score_info[0][1],
            #     "social": student_score_info[0][2],
            #     "emotion":student_score_info[0][3],
            #     "stu_character": student_score_info[0][4],
            #     "learn": student_score_info[0][5],
            # }
            data = [
                student_score_info[0][0],
                student_score_info[0][1],
                student_score_info[0][2],
                student_score_info[0][3],
                student_score_info[0][4],
                student_score_info[0][5],
            ]
            response = {
                'code': 1,
                'msg': '查询成功',
                'data': data
            }
        else:
            response = {
                'code': 0,
                'msg': '查询失败，未找到相关书籍。',
                'data': []
            }
    except Exception as e:
        response = {
            'code': 0,
            'msg': '查询出错',
            'data': []
        }

    return str(response)

if __name__ == '__main__':
    app.run(debug=True)
