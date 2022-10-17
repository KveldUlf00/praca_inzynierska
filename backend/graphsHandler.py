import pandas as pd
import networkx as nx

def transformData(file):
    nodes = []
    links = []
    connection_list = []
    data = pd.read_csv(file, sep=", ", header = None)

    def checkNamesUniqueness(name):
        for node in nodes:
            print(name, node["name"])
            if name == node["name"]:
                return False
        return True

    def checkLinksUniqueness(link):
        for node in links:
            print(link, node)
            if { 'source': link[0], 'target': link[1]} == { 'source': node['source'], 'target': node['target']} or { 'source': link[1], 'target': link[0]} == { 'source': node['target'], 'target': node['source']}:
                return False
        return True

    for index in range(data.shape[0]) :
        if checkNamesUniqueness(data[0][index]):
            nodes.append({ 'name': data[0][index] })
        if checkNamesUniqueness(data[1][index]):
            nodes.append({ 'name': data[1][index] })
        
        if checkLinksUniqueness([data[0][index], data[1][index]]):
            linkToAdd = {}
            linkToAdd['source'] = data[0][index]
            linkToAdd['target'] = data[1][index]

            for attrIndex in range(2, data.shape[1]):
                attr = data[attrIndex][index].split(": ")
                linkToAdd[attr[0]] = attr[1]

            links.append(linkToAdd)
            # list important for networkx package
            connection_list.append((data[0][index], data[1][index]))
            # TODO: miejsce na macierz kowariancji


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

    def correlation(Graph):
        # Korelacja
        corr = nx.degree_pearson_correlation_coefficient(Graph)
        print(corr)

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

    return {"data": {'nodes': nodes, 'links': links}, 'fileName': file.filename, 'cliques': cliques}





