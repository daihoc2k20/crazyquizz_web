export class FireCollections {
  static readonly users = "users";
  static readonly topics = "topics";

  static user(id: string) {
    return `${FireCollections.users}/${id}`;
  }

  static topic(id: string) {
    return `${FireCollections.topics}/${id}`;
  }

  static userHistory(userId: string, historyId: string) {
    return `users/${userId}/histories/${historyId}`;
  }

  static userHistories(userId: string) {
    return `users/${userId}/histories`;
  }

  static userTopics(userId: string) {
    return `users/${userId}/topics`;
  }

  static userTopic(userId: string, topicId: string) {
    return `users/${userId}/topics/${topicId}`;
  }

  static topicQuestions(topicId: string) {
    return `topics/${topicId}/questions`;
  }
}
