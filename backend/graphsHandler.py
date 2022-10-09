import pandas as pd
import networkx as nx

def transformData(file):
    nodes = []
    links = []
    connection_list = []
    data = pd.read_csv(file, sep=": ", header = None)

    for index in range(data.shape[0]) :
        nodes.append({ 'name': data[0][index] })
        for name in data[1][index].split(", "):
            links.append({ 'source': data[0][index], 'target': name})
            # list important for networkx package
            connection_list.append((data[0][index], name))


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

    G = nx.Graph()
    G.add_edges_from(connection_list)
    G.nodes(data=True)

    verticesDegree(G)
    closenessCentrality(G)

    return {"data": {'nodes': nodes, 'links': links}, 'fileName': file.filename}





