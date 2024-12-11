export interface IPost {
  /**
   * id link đến bảng user
   */
  author: string
  thumbnail: string
  title: string
  /**
   * html content
   */
  content: string
  content_html: string
  createdAt: string
  updatedAt: string
  youtubeLink: string
}
