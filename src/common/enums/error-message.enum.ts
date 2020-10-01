// MODULE
export enum RoleErrorMsg {
  ROLE_NOT_FOUND = 'Role not found',
}

export enum UserErrorMsg {
  EMAIL_EXIST = 'Email already exists',
  USER_NOT_FOUND = 'User not found',
}

export enum GroupErrorMsg {
  GROUP_NOT_FOUND = 'Group not found',
  ROLE_NOT_IN_GROUP = "This group doesn't contain role or this group doesn't exist",
}

export enum PermissionErrorMsg {
  PERMISSION_NOT_FOUND = 'Permission is not found',
}

export enum IdeaErrorMsg {
  IDEA_NOT_FOUND = 'Idea not found',
}

export enum CommentErrorMsg {
  COMMENT_NOT_FOUND = 'Comment not found',
}
