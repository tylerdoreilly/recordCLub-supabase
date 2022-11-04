import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile'
import { SessionNew } from '../models/session'

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabase: SupabaseClient
  public _session: AuthSession | null = null
  public _user:User
  
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  public getUser(): User|null {
    this.supabase.auth.getUser().then(({ data }) => {
      this._user = data.user
    })
    return this._user
  }

  public getSession(): Session|null {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  async getProfile(userId){
    // const user = this.getUser();
    // const { data: { user } } = await this.supabase.auth.getUser()
    return this.supabase.from('profiles')
    .select('username, avatar_url')
    .eq('id', userId)
    .single();
  }

  public updateProfile(userUpdate): any {
    const user = this.getUser();

    const update = {
      username: userUpdate.username,
      avatar_url: userUpdate.avatar_url,
      id: user?.id,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update)
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  async signInWithEmail(email, password) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }

  async signUp(email, password){
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    })
  }
  

  signOut() {
    return this.supabase.auth.signOut()
  }

  // updateProfile(profile: Profile) {
  //   const update = {
  //     ...profile,
  //     updated_at: new Date(),
  //   }

  //   return this.supabase.from('profiles').upsert(update)
  // }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  ////////////////////////////////////////////////////////////////
  //// SupaBase - will break up post testing/learning

  clubs(){
    return this.supabase
      .from('Clubs')
      .select(`*`)
  }

  // Sessions
  getSBUpcomingSession(){
    return this.supabase
      .from('sessions')
      .select(`*, seasons (title)`)
      .order('week', { ascending: false })
      .limit(1)
  }

  getSBAllSessions(){
    return this.supabase
      .from('sessions')
      .select(`*, seasons (title)`)
      .order('week', { ascending: false })
  }

  async getSBSession(value){
    const session = await this.supabase
    .from('sessions')
    .select('*, seasons(title,id), bracketeer(displayName,avatar,id)')
    .eq('sessionId', value)

    return session.data || [];
  }

  getSBSessionsByTitle(filterItem){
    return this.supabase
      .from('sessions')
      .select(`*, seasons (title)`)
      .eq('title', filterItem)
  }

 async createSBSession(data){
  const { error } = await this.supabase
    .from('sessions')
    .insert(data)
  }

  // Seasons
  getSBSeasons(){
    return this.supabase
    .from('seasons')
    .select(`*`)
  }

 //Albums
 async getSessionAlbums(value){
  const albums = await this.supabase
  .from('albums')
  .select('*, seasons(title,id), submittedBy(displayName,avatar,id)')
  .eq('sessionId', value)

  return albums.data || [];
 }

 async getAlbum(value){
  const album = await this.supabase
  .from('albums')
  .select('*, seasons(title,id), submittedBy(displayName,avatar,id)')
  .eq('id', value)

  return album.data[0] || [];
 }

 async createAlbum(data){
  const { error } = await this.supabase
    .from('albums')
    .insert(data)
 }

 async updateAlbumAvgScore(avgScore, albumId){
  const { error } = await this.supabase
  .from('albums')
  .update({ averageScore: avgScore })
  .eq('id', albumId)
 }

 // Scores
 async getAlbumScores(value){
  const scores = await this.supabase
  .from('scores')
  .select('*')
  .eq('albumId', value)

  return scores.data || [];
 }

 async addScores(scores, avgScore, albumId){
  const { error } = await this.supabase
  .from('scores')
  .insert(scores)

  const { } = await this.supabase
  .from('albums')
  .update({ averageScore: avgScore })
  .eq('id', albumId)
 }
 

  // Members
  getSBMembers(){
    return this.supabase
    .from('members')
    .select(`*`)
  }

  // async getBoards() {
  //   const boards = await this.supabase.from(USER_BOARDS_TABLE).select(`
  //   boards:board_id ( title, id )
  // `)
  //   return boards.data || []
  // }
}
