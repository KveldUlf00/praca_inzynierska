import pandas as pd
import networkx as nx
from flask import json

def transformData(file):
    nodes = []
    links = []
    connection_list = []
    matrixData = {}
    corrObject = {}

    data = json.load(file)

    def checkNamesUniqueness(elem):
        for node in nodes:
            if elem["name"] == node["name"]:
                return False
        return True

    def checkLinksUniqueness(link):
        for node in links:
            if { 'source': link[0], 'target': link[1]} == { 'source': node['source'], 'target': node['target']} or { 'source': link[1], 'target': link[0]} == { 'source': node['source'], 'target': node['target']}:
                return False
        return True

    for node in data["nodes"]:
        if checkNamesUniqueness(node):
            nodes.append(node)

            attrToMatrix = []
            for attribute in node["attributes"]:
                attrToMatrix.append(node["attributes"][attribute])
            matrixData[node["name"]] = attrToMatrix

    for conn in data["connections"]:
        if checkLinksUniqueness(conn):
            linkToAdd = {}
            linkToAdd['source'] = conn[0]
            linkToAdd['target'] = conn[1]

            links.append(linkToAdd)
        # list important for networkx package
            connection_list.append((conn[0], conn[1]))


    # correlation matrix
    df = pd.DataFrame(matrixData)
    corr = df.corr()

    nodeNames = [elem["name"] for elem in nodes]

    for nameColumn in nodeNames:
        nameObjectCorr = {}
        for nameRow in nodeNames:
            nameObjectCorr[nameRow] = corr[nameColumn][nameRow]
        corrObject[nameColumn] = nameObjectCorr


    # add correlation values to node
    for node in nodes:
        node["correlations"] = corrObject[node["name"]]


    # networkx
    def verticesDegree(Graph):
        # Stopień wierzchołków
        for node in list(Graph.nodes):
            for nodeElem in nodes:
                if nodeElem["name"] == node:
                    nodeElem["verticesDegree"] = Graph.degree[node]

    def closenessCentrality(Graph):
        # Centralność bliskości
        for node in Graph.nodes:
            for nodeElem in nodes:
                if nodeElem["name"] == node:
                    nodeElem["closenessCentrality"] = round(nx.closeness_centrality(Graph)[node], 3)

    def allCliques(Graph):
        cliques = list(nx.enumerate_all_cliques(Graph))
        cliques = [cliq for cliq in cliques if len(cliq) > 2]
        return cliques


    G = nx.Graph()
    G.add_edges_from(connection_list)
    G.nodes(data=True)

    verticesDegree(G)
    closenessCentrality(G)
    cliques = allCliques(G)

    return {"data": {'nodes': nodes, 'links': links}, 'fileName': data["title"], 'cliques': cliques, 'corr': corrObject}
