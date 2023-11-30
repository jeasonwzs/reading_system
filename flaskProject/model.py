import pickle

import openai
import pandas as pd
import numpy as np

from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder

from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA
from collections import Counter

import tensorflow as tf
from tensorflow.python import keras
from keras.layers import Dense, Flatten, Conv2D
from keras import Model
from tensorflow.python.ops import math_ops
from tensorflow.python.ops import summary_ops_v2

# from sentence_transformers import SentenceTransformer, models


#  需要替换成自己的本地路径
books_matrics = pickle.load(open('books_matrics.p', mode='rb'))
books_matrics.shape

users_matrics = pickle.load(open('users_matrics.p', mode='rb'))
users_matrics.shape

books = pd.read_csv(
    './book_info.csv',
    sep=',',
    header=0,  # 设置标题行为第一行
)
books_orig = books.values

# 读取文件
users = pd.read_csv('./student_info.csv', sep=',', header=0,  engine='python')
users_orig = users.values




def recommend_same_type_user(user_id_val, top_k=10):
    # 计算用户嵌入的L2范数
    norm_users_matrics = tf.sqrt(tf.reduce_sum(tf.square(users_matrics), 1, keepdims=True))
    # 对用户嵌入进行归一化
    normalized_users_matrics = users_matrics / norm_users_matrics

    # 推荐同类型的用户
    user_embedding = tf.reshape(normalized_users_matrics[user_id_val], [1, 200])
    user_similarity = tf.matmul(user_embedding, tf.transpose(normalized_users_matrics))
    sim_scores = np.squeeze(user_similarity.numpy())

    # print("您是：{}".format(users_orig[user_id_val - 1]))
    # print("以下是给您的推荐（相似类型的用户）：")

    # 处理情况：确保要选择的索引在有效范围内
    valid_indices = np.arange(len(sim_scores))
    valid_indices = np.setdiff1d(valid_indices, user_id_val)  # Remove the user itself from recommendations
    if len(valid_indices) < top_k:
        print("Error: Not enough users for recommendations.")
        return

    # 将相似性分数的前top_k个索引设置为非零，其余为零
    top_k_indices = np.argsort(sim_scores)[valid_indices][-top_k:]
    sim_scores[top_k_indices] = sim_scores[top_k_indices] / np.sum(sim_scores[top_k_indices])

    # 从概率分布中随机选择top_k个用户作为推荐结果
    recommended_user_indices = set()
    while len(recommended_user_indices) != top_k:
        user_index = np.random.choice(top_k_indices, 1)[0]
        recommended_user_indices.add(user_index)
    friend={}
    for user_index in recommended_user_indices:
        # print(user_index)
        # print(users_orig[user_index - 1])
        friend[str(user_index)] = "123"

    return recommended_user_indices, friend





# recommend_same_type_user(10)




def recommend_least_similar_books(user_id_val, top_k=10):
    # 推荐您相似度最低的图书
    # 获取用户的嵌入
    user_embedding = users_matrics[user_id_val - 1].reshape([1, 200])

    # 计算用户嵌入与所有图书嵌入的相似性
    books_similarity = tf.matmul(user_embedding, tf.transpose(books_matrics))
    sim_scores = np.squeeze(books_similarity.numpy())

    # 将相似性分数的前top_k个索引设置为非零，其余为零
    sim_scores[np.argsort(sim_scores)[:top_k]] = 0
    sim_scores = sim_scores / np.sum(sim_scores)

    # 从概率分布中随机选择top_k本图书作为推荐结果
    recommended_books_indices = set()
    while len(recommended_books_indices) != top_k:
        book_index = np.random.choice(len(sim_scores), 1, p=sim_scores)[0]
        recommended_books_indices.add(book_index)

    # print("以下是给您的推荐（相似度最低）：")
    idandname={}
    for book_index in recommended_books_indices:
        # print(book_index)
        # print(books_orig[book_index][0])
        idandname[str(book_index)]=books_orig[book_index][0]

    return recommended_books_indices,idandname

def recommend_method():
    # 设置您的 OpenAI API 密钥
    openai.api_key = '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'

    # 提问给 ChatGPT   prompt
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="有哪些合适的阅读方法？",
        temperature=0.7,
        max_tokens=300
    )

    # 获取回答
    answer = response.choices[0].text.strip()

        # 寻找最后一个句号的索引
    last_period_index = answer.rfind('。')

    if last_period_index != -1:
            # 截取最后一个句号前面的字符串
        result = answer[:last_period_index + 1]
    return result


def recommend_method():
    # 设置您的 OpenAI API 密钥
    openai.api_key = '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'

    # 提问给 ChatGPT   prompt
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="有哪些合适的阅读方法？",
        temperature=0.7,
        max_tokens=300
    )

    # 获取回答
    answer = response.choices[0].text.strip()

        # 寻找最后一个句号的索引
    last_period_index = answer.rfind('。')

    if last_period_index != -1:
            # 截取最后一个句号前面的字符串
        result = answer[:last_period_index + 1]
    return result



# _,idandname=recommend_least_similar_books(10)
# print(idandname)

