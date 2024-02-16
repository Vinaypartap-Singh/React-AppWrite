import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Database Services

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite Get POST:: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("Status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite Get POSTS:: ", error);
    }
  }

  async createPost({ Title, Slug, Content, featuredImage, Status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { Title, Content, featuredImage, Status, Slug, userId },
      );
    } catch (error) {
      console.log("ERROR IN CREATE POST::", error);
    }
  }

  async updatePost(slug, { Title, Content, featuredImage, Status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          Title,
          Content,
          featuredImage,
          Status,
        },
      );
    } catch (error) {
      console.log("UPDATE POST ERROR:: ", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("DELETE POST ERROR:: ", error);
    }
  }

  // Storage Services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("UPLOAD FILE ERROR:: ", error);
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
    } catch (error) {
      console.log("DELETE FILE ERROR:: ", error);
    }
  }

  getFilePreview(fileID) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
    } catch (error) {
      console.log("GET FILE PREVIEW ERROR:: ", error);
    }
  }
}

const service = new Service();

export default service;
