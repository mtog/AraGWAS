import ApiVersion from "../models/apiversion";
import Gene from "../models/gene";
import Page from "../models/page";
import Study from "../models/study";

// TODO convert to Typescript
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    throw error;
  }
}

// TODO convert to Typescript
function convertToModel<T>(response): T {
    return response.json();
}
// Study list
export async function loadStudies(page: number = 1, ordering = "") {
    return fetch(`/api/studies/?page=${page}&ordering=${ordering}`)
        .then(checkStatus)
        .then(convertToModel);
}

// Import single study information
export async  function loadStudy(studyId: number) {
    return fetch(`/api/studies/${studyId}`)
        .then(checkStatus)
        .then(convertToModel);
}
export async  function loadAssociationsOfStudy(studyId: number, page= 1) {
    return fetch(`/api/associations_of_study/${studyId}/?page=${page}`)
        .then(checkStatus)
        .then(convertToModel);
}
// Load associations for manhattan plots
export async  function loadAssociationsForManhattan(studyId: number) {
    return fetch(`/api/associations_manhattan/${studyId}`)
        .then(checkStatus)
        .then(convertToModel);
}

// Phenotype list
export async  function loadPhenotypes(page: number = 1, ordering= "") {
    return fetch(`/api/phenotype/?page=${page}&ordering=${ordering}`)
        .then(checkStatus)
        .then(convertToModel);
}

// Import single phenotype information
export async  function loadPhenotype(phenotypeId: number) {
    return fetch(`/api/phenotype/${phenotypeId}`)
        .then(checkStatus)
        .then(convertToModel);
}
export async  function loadAssociationsOfPhenotype(phenotypeId: number, page: number= 1) {
    return fetch(`/api/associations_of_phenotype/${phenotypeId}/?page=${page}`)
        .then(checkStatus)
        .then(convertToModel);
}
// Load similar phenotypes based on ontology
export async function loadSimilarPhenotypes(phenotypeId: number) {
    return fetch(`/api/similar_phenotypes/${phenotypeId}/`)
        .then(checkStatus)
        .then(convertToModel);
}

// Gene list
export async  function loadGenes(page: number = 1, ordering= "") {
    return fetch(`/api/gene/?page=${page}&ordering=${ordering}`)
        .then(checkStatus)
        .then(convertToModel);
}

// Import single gene information
export async function loadGene(geneId = ""): Promise<Gene> {
    return fetch(`/api/gene/${geneId}`)
        .then(checkStatus)
        .then(convertToModel);
}
export async  function loadAssociationsOfGene(geneId= "1", page: number = 1, ordering= "-pvalue") {
    return fetch(`/api/associations_of_gene/${geneId}/?page=${page}&ordering=${ordering}`)
        .then(checkStatus)
        .then(convertToModel);
}

export async function loadTopAssociations(filter) {
    return fetch(`/api/top_associations/?chr=${filter["chr"]}&maf=${filter["maf"]}&anno=${filter["annotation"]}&type=${filter["type"]}&page=${filter["page"]}`)
        .then(checkStatus)
        .then(convertToModel);
}
export async  function loadTopGenes() {
    return fetch(`/api/top_gene/`)
        .then(checkStatus)
        .then(convertToModel);
}
export async function loadAssociationCount() {
    return fetch(`/api/associations/association_count/`)
        .then(checkStatus)
        .then(convertToModel);
}

export async function search(queryTerm= "", page: number = 1, ordering= "") {
    if (queryTerm === "") {
        return fetch(`/api/search/search_results/?page=${page}&ordering=${ordering}`)
            .then(checkStatus)
            .then(convertToModel);
    } else {
        return fetch(`/api/search/search_results/${queryTerm}/?page=${page}&ordering=${ordering}`)
            .then(checkStatus)
            .then(convertToModel);
    }
}

export async function autoCompleteGenes(queryTerm: string): Promise<Gene[]> {
    return fetch(`/api/autocomplete/genes/${queryTerm}`)
        .then(checkStatus)
        .then(convertToModel);
}

export async  function loadApiVersion(): Promise<ApiVersion> {
    return fetch("/api/version/")
        .then(checkStatus)
        .then(convertToModel);
}
