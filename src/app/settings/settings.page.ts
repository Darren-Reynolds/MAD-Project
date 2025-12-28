import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  selectedUnit: string = 'metric'; // Default [cite: 59]

  constructor(private storage: StorageService) { }

  async ngOnInit() {
    this.selectedUnit = await this.storage.getUnit();
  }

  async unitChanged(event: any) {
    this.selectedUnit = event.detail.value;
    await this.storage.setUnit(this.selectedUnit);
  }
}