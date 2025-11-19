export interface UnityAuthResponse {
  userId: string
  idToken: string
  sessionToken: string
  expiresIn: number
  user: {
    id: string
    disabled: boolean
    externalIds: unknown[]
  }
}

export interface UnityButton {
  active: boolean
  title: string
  url: string
  BGColor: string
}

export interface UnityClubConfig {
  BGColor: string
  Buttons: UnityButton[]
}

export interface UnitySettings {
  [configKey: string]: UnityClubConfig
}

export interface UnityRemoteConfigResponse {
  configs: {
    settings: UnitySettings
  }
  metadata: {
    configAssignmentHash: string
    assignmentId: string
    environmentId: string
  }
}

export interface LinkItem {
  label: string
  url: string
  color: string
}

export interface ClubConfig {
  id: string
  url: string
  color: string
  links: LinkItem[]
}
