import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AssetService, Asset } from '../../services/asset';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './asset-list.html',
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];
  constructor(private assetService: AssetService) {}
  ngOnInit() {
    this.assetService.getAssets().subscribe(data => this.assets = data);
  }
}