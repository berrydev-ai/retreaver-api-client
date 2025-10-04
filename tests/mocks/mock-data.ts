import { CallV1, CallV2, Affiliate, Target, Campaign, CallV1StatusEnum, CampaignGreetingVoiceGenderEnum, MenuOptionOptionEnum } from '../../models'

// Mock data based on API documentation examples
export const mockCallsV1: CallV1[] = [
  {
    uuid: "addcf985-017e-4962-be34-cf5d55e74afc",
    caller: "+17195220377",
    caller_zip: "80920",
    caller_state: "CO",
    caller_city: "COLORADO SPRINGS",
    caller_country: "US",
    dialed_call_duration: 193,
    total_duration: 204,
    status: CallV1StatusEnum.Finished,
    start_time: "2012-04-29T12:29:40Z",
    forwarded_time: "2012-04-29T12:29:51Z",
    end_time: "2012-04-29T12:32:46Z",
    cid: "0003",
    afid: "03994",
    sid: null,
    dialed_number: "+18668987878",
    recording_url: "http://callpixels.com/recordings/87d43a5f5c88041687f9fd1bb6a58d6f/call_17192096019_1342303189.mp3",
    updated_at: "2012-04-29T12:29:46Z",
    created_at: "2012-04-29T12:29:40Z"
  },
  {
    uuid: "8ae0aa38-0173-4e62-5342-cf5d55e74afe",
    caller: "+14166686981",
    caller_zip: null,
    caller_state: "ON",
    caller_city: "TORONTO",
    caller_country: "CA",
    dialed_call_duration: 33,
    total_duration: 40,
    status: CallV1StatusEnum.Finished,
    start_time: "2012-04-29T12:29:40Z",
    forwarded_time: "2012-04-29T12:29:51Z",
    end_time: "2012-04-29T12:32:46Z",
    cid: "0003",
    afid: "03994",
    sid: null,
    dialed_number: "+18668987878",
    recording_url: "http://callpixels.com/recordings/87d43a5f5c88041687f9fd1bb6a58d6f/call_17192096019_1342303189.mp3",
    updated_at: "2012-04-29T12:29:46Z",
    created_at: "2012-04-29T12:29:40Z"
  }
]

export const mockCallsV2: CallV2[] = [
  {
    uuid: "f1abfb78-ab8a-4146-9946-8169fbcc6d6c",
    caller: "+13015236555",
    caller_zip: "28379",
    caller_state: "NC",
    caller_city: "Rockingham",
    caller_country: "US",
    dialed_call_duration: 2,
    total_duration: 14,
    status: CallV1StatusEnum.Finished,
    start_time: "2024-11-04T16:52:18.034Z",
    forwarded_time: "2024-11-04T16:52:25.423Z",
    end_time: "2024-11-04T16:52:32.882Z",
    cid: "1",
    afid: null,
    sid: null,
    dialed_number: "+12263399112",
    recording_url: "https://example.com",
    updated_at: "2024-11-04T16:53:00.756Z",
    created_at: "2024-11-04T16:52:18.177Z"
  }
]

export const mockAffiliates: Affiliate[] = [
  {
    afid: "0002",
    first_name: "Nancy",
    last_name: "Drew",
    company_name: "Acme",
    updated_at: "2012-05-03T15:56:01Z",
    created_at: "2012-05-03T15:56:01Z"
  }
]

export const mockTargets: Target[] = [
  {
    id: 6588,
    number: "+18668987878",
    name: "Jason Cell",
    tid: null,
    priority: 1,
    weight: 1,
    timeout_seconds: 15,
    send_digits: null,
    concurrency_cap: null,
    paused: false,
    time_zone: "Eastern Time (US & Canada)",
    sip_username: null,
    sip_password: null,
    created_at: "2014-08-14T20:46:01.158-04:00",
    updated_at: "2016-06-28T13:02:52.964-04:00"
  }
]

export const mockCampaigns: Campaign[] = [
  {
    cid: "111",
    name: "SuperFuntime",
    updated_at: "2012-07-15T03:40:24Z",
    created_at: "2012-04-16T13:50:21Z",
    record_calls: true,
    record_seconds: 3600,
    dedupe_seconds: 86400,
    affiliate_can_pull_number: false,
    show_key: "5e2ba674a8a1fb34dddcf850139ffdd9",
    greeting: {
      message: "Hi There! Press one to continue.",
      voice_gender: CampaignGreetingVoiceGenderEnum.Female
    },
    timers: [
      {
        timer: {
          id: 195,
          seconds: 0,
          url: "http://www.thertrack.com/click.track?CID=[campaign_id]&AFID=[affiliate_id]&SID=[sub_id]"
        }
      },
      {
        timer: {
          id: 199,
          seconds: 90,
          url: "http://www.thertrack.com/pixel.track?CID=[campaign_id]&AFID=[affiliate_id]&SID=[sub_id]&MerchantReferenceID=[caller_id]-[called_number]-[call_duration]"
        }
      }
    ],
    menu_options: [
      {
        menu_option: {
          id: 61,
          option: MenuOptionOptionEnum._1,
          target_cid: null,
          target_number: "+18987748833"
        }
      }
    ]
  }
]

// API response wrappers
export const mockCallV1Response = {
  call: mockCallsV1[0]
}

export const mockCallsV1ListResponse = {
  data: mockCallsV1.map(call => ({ call }))
}

export const mockCallV2Response = {
  call: mockCallsV2[0]
}

export const mockCallsV2ListResponse = {
  data: mockCallsV2.map(call => ({ call }))
}

export const mockAffiliateResponse = {
  affiliate: mockAffiliates[0]
}

export const mockAffiliatesListResponse = {
  data: mockAffiliates.map(affiliate => ({ affiliate }))
}

export const mockTargetResponse = {
  target: mockTargets[0]
}

export const mockTargetsListResponse = {
  data: mockTargets.map(target => ({ target }))
}

export const mockCampaignResponse = {
  campaign: mockCampaigns[0]
}

export const mockCampaignsListResponse = {
  data: mockCampaigns.map(campaign => ({ campaign }))
}

// Error responses
export const mockNotFoundResponse = {
  response: {
    status: 404,
    data: {
      error: "Not found"
    }
  }
}

export const mockUnauthorizedResponse = {
  response: {
    status: 401,
    data: {
      error: "Unauthorized"
    }
  }
}

export const mockValidationErrorResponse = {
  response: {
    status: 422,
    data: {
      error: "Validation failed",
      details: {
        api_key: ["is required"]
      }
    }
  }
}